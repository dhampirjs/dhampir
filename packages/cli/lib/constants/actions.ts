enum ACTIONS {
    BUILD ='build',
    GENERATE = 'generate',
    START = 'start',
    CLEAN = 'clean',
    BUNDLE = 'bundle',
    BANG = 'bang',
    LIST = 'list',
};

const actionList = [ACTIONS.BUILD, ACTIONS.GENERATE, ACTIONS.START, ACTIONS.CLEAN, ACTIONS.BUNDLE, ACTIONS.BANG, ACTIONS.LIST];
export {
    ACTIONS,
    actionList,
}
