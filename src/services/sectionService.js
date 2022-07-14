const pool = require("../db");

function getSection(sectionId) {
  return pool
    .query(
      {
        sql: `
        SELECT DISTINCT section.id, section.title, section.createdAt, section.updatedAt, todo.id, todo.title, todo.description, todo.priority, todo.createdAt, todo.updatedAt
        FROM Section as section
        LEFT JOIN Todo as todo
        ON section.id = todo.sectionId
        WHERE section.id = ?
        ORDER BY todo.priority ASC;
        `,
        nestTables: true,
      },
      [sectionId]
    )
    .then(([rows]) => {
      if (rows.length === 0) {
        return {};
      }
      const todos = rows.map((row) => row.todo).filter((todo) => todo.id);
      return {
        ...rows[0].section,
        todos,
      };
    });
}

module.exports = { getSection };