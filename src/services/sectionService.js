const pool = require("../db");

function createSection(userId, title) {
  return pool.query(`INSERT INTO Section ( title, userId ) VALUES ( ?, ? );`, [
    title,
    userId,
  ]);
}

function getSections(userId) {
  return pool
    .query(
      `
        SELECT DISTINCT id, title, createdAt, updatedAt
        FROM Section
        WHERE userId = ?
        ORDER BY id ASC;
      `,
      [userId]
    )
    .then(([rows]) => {
      return rows;
    });
}

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

function updateSection(sectionId, title) {
  return pool.query(`UPDATE Section SET title = ? WHERE id = ?;`, [
    title,
    sectionId,
  ]);
}

function deleteSection(sectionId) {
  return pool.query(`DELETE FROM Section WHERE id = ?`, sectionId);
}

module.exports = {
  createSection,
  getSections,
  getSection,
  updateSection,
  deleteSection,
};