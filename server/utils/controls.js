module.exports.adminControl = (grade) => {
  const grades = ["admin", "manager"];
  if (!grades.includes(grade) && process.NODE_ENV === "production") {
    return {
      error: "unautorized operation",
    };
    // return next(new Unauthorized("unautorized operation"));
  }
};
