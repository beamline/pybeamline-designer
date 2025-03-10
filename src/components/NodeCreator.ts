


async function createNode(name: string, folder: string, id: string) {
    const path = `/src/logic/schemas/${folder}/${name}.json`;
    const files = import.meta.glob("/src/logic/schemas/**/*.json");
    const module = await files[path]();
    const schema = module.default

}

export {createNode}