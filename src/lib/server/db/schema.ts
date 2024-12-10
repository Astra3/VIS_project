import { relations } from 'drizzle-orm';
import { pgTable, integer, varchar, serial, foreignKey, boolean, text } from 'drizzle-orm/pg-core';

// set_num,name,year,theme_id,num_parts,img_ur
export const sets = pgTable('sets', {
	set_num: varchar('set_num', { length: 20 }).primaryKey(),
	name: varchar('name').notNull(),
	year: integer('year').notNull(),
	theme_id: integer('theme_id')
		.notNull()
		.references(() => themes.id),
	num_parts: integer('num_parts').notNull(),
	img_url: varchar('img_url').notNull()
});

export const sets_relations = relations(sets, ({ many }) => ({
	themes: many(themes),
	listings: many(marketplace_listings)
}));

// id,name,parent_id
export const themes = pgTable(
	'themes',
	{
		id: serial('id').primaryKey(),
		name: varchar('name').notNull(),
		parent_id: integer('parent_id')
	},
	(table) => ({
		parentReference: foreignKey({
			columns: [table.parent_id],
			foreignColumns: [table.id],
			name: 'parent_theme_fk'
		})
	})
);

export const themes_relations = relations(themes, ({ one }) => ({
	sets: one(sets, {
		fields: [themes.id],
		references: [sets.theme_id]
	}),
	parent: one(themes, {
		fields: [themes.parent_id],
		references: [themes.id]
	})
}));

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 20 }).notNull(),
	marketplace_admin: boolean('marketplace_admin').notNull().default(false),
	database_admin: boolean('database_admin').notNull().default(false),
	warnings: integer('warnings').notNull().default(0)
});

export const users_relations = relations(users, ({ many }) => ({
	listings: many(marketplace_listings)
}));

export const marketplace_listings = pgTable('marketplace_listings', {
	id: serial('id').primaryKey(),
	author_id: integer('authod_id')
		.notNull()
		.references(() => users.id),
	set_id: varchar('set_id', { length: 20 })
		.notNull()
		.references(() => sets.set_num),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	image: varchar('image')
});

export const marketplace_listings_relations = relations(marketplace_listings, ({ one }) => ({
	author: one(users, {
		fields: [marketplace_listings.author_id],
		references: [users.id]
	}),
	set: one(sets, {
		fields: [marketplace_listings.set_id],
		references: [sets.set_num]
	})
}));
