const AgentController = require('../features/agent/agent.controller');
const BaseMiddleWare = require ('../shared/middleware/base-middleware');

const registerAgentRoutes = (app) => {
  
  app.post('/agent-create', AgentController.createAgent);

  app.get('/agents', AgentController.getAllAgents);

  app.get('/agents-by-region',  BaseMiddleWare.validateRegion,AgentController.getAgentsByRegion);

  app.put('/agent-update-info/:id', AgentController.updateAgentInfo);

  app.post('/agent-delete/:id', AgentController.deleteAgent);
}

module.exports = {registerAgentRoutes};