var { toKebabCase, toPascalCase } = require("../utils.js");

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt({
        type: "input",
        name: "name",
        message: "페이지 디렉토리 명을 kebab-case 로 입력하세요.",
      })
      .then(({ name }) => {
        if (!name) {
          throw new Error("페이지 경로를 입력하세요!");
        }
        if (new RegExp(/[^a-z\-]/).test(name)) {
          throw new Error("페이지 디렉토리 명은 kebab-case 이어야 합니다.");
        }

        return prompter
          .select({
            type: "input",
            name: "category",
            message: `route1 경로를 추가하시겠습니까?\nsrc/pages/${name}/{:route1}`,
            choices: ["Y", "N"],
          })
          .then((choice) => {
            if (choice === "Y") {
              return prompter
                .prompt({
                  type: "input",
                  name: "name",
                  message:
                    "route1 페이지 디렉토리 명을 kebab-case 로 입력하세요.",
                })
                .then(({ name: route1 }) => {
                  if (!route1) {
                    throw new Error("페이지 경로를 입력하세요!");
                  }
                  if (new RegExp(/[^a-z\-]/).test(route1)) {
                    throw new Error(
                      "페이지 디렉토리 명은 kebab-case 이어야 합니다."
                    );
                  }

                  return prompter
                    .select({
                      type: "input",
                      name: "category",
                      message: `route2 경로를 추가하시겠습니까?\nsrc/pages/${name}/${route1}/{:route2}`,
                      choices: ["Y", "N"],
                    })
                    .then((choice) => {
                      if (choice === "Y") {
                        return prompter
                          .prompt({
                            type: "input",
                            name: "name",
                            message:
                              "route2 페이지 디렉토리 명을 kebab-case 로 입력하세요.",
                          })
                          .then(({ name: route2 }) => {
                            if (!route2) {
                              throw new Error("페이지 경로를 입력하세요!");
                            }
                            if (new RegExp(/[^a-z\-]/).test(route1)) {
                              throw new Error(
                                "페이지 디렉토리 명은 kebab-case 이어야 합니다."
                              );
                            }

                            return {
                              name: toKebabCase(name),
                              pascal: toPascalCase(name),
                              route1: toKebabCase(route1),
                              route2: toKebabCase(route2),
                              fileName: `${toPascalCase(name)}${toPascalCase(
                                route1
                              )}${toPascalCase(
                                route2.replace("[", "").replace("]", "")
                              )}`,
                              args,
                            };
                          });
                      } else {
                        return {
                          name: toKebabCase(name),
                          pascal: toPascalCase(name),
                          route1: toKebabCase(route1),
                          route2: "",
                          fileName: `${toPascalCase(name)}${toPascalCase(
                            route1
                          )}`,
                          args,
                        };
                      }
                    });
                });
            } else {
              return {
                name: toKebabCase(name),
                pascal: toPascalCase(name),
                route1: "",
                route2: "",
                fileName: toPascalCase(name),
                args,
              };
            }
          });
      });
  },
};
