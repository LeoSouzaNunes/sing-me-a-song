import testsRepository from "../repositories/testsRepository.js";

async function reset() {
    await testsRepository.resetDatabase();
}

export default { reset };
