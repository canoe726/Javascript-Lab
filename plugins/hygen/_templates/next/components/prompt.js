var { toPascalCase } = require("../utils.js");

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt({
        type: "input",
        name: "name",
        message: "컴포넌트 이름을 PascalCase 로 입력하세요.",
      })
      .then(({ name }) => {
        if (!name) {
          throw new Error("컴포넌트 이름을 입력하세요!");
        }
        if (!new RegExp(/^[a-zA-Z0-9]*$/).test(name)) {
          throw new Error("컴포넌트 이름은 PascalCase 이여야 합니다.");
        }

        return {
          name: toPascalCase(name),
          args,
        };
      });
  },
};
