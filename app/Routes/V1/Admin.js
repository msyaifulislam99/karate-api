'use strict';

const Route = use('Route');

const Private = () => {
  // ================= CATEGORIES =================
  Route.get('categories', 'V1/Admin/CategoryController.Index');
  Route.get('categories/:id', 'V1/Admin/CategoryController.Show');
  Route.post('categories', 'V1/Admin/CategoryController.Store');
  Route.put('categories/:id', 'V1/Admin/CategoryController.Update');
  Route.post('categories/:id/images', 'V1/Admin/CategoryController.StoreImage');
  Route.delete('categories/:id/images', 'V1/Admin/CategoryController.DestroyImage');
  Route.delete('categories/:id', 'V1/Admin/CategoryController.Destroy');

  // ================= RESTAURANTS =================
  Route.get('restaurants', 'V1/Admin/RestaurantController.Index');
  Route.get('restaurants/:id', 'V1/Admin/RestaurantController.Show');
  Route.put('restaurants/:id', 'V1/Admin/RestaurantController.Update');

  // ================= USERS =================
  Route.get('users', 'V1/Admin/UserController.Index');
  Route.get('users/:id', 'V1/Admin/UserController.Show');
  Route.put('users/:id', 'V1/Admin/UserController.Update');

  // Events
  Route.get('events', 'V1/Admin/EventController.Index');
  Route.get('event/:id', 'V1/Admin/EventController.Show');
  Route.post('event', 'V1/Admin/EventController.Store');
  Route.put('event/:id', 'V1/Admin/EventController.Update');
  Route.delete('event/:id', 'V1/Admin/EventController.Destroy');
  Route.post('event/:id/images', 'V1/Admin/EventController.StoreImage');
  Route.delete('event/:id/images', 'V1/Admin/EventController.DestroyImage');

  // Judge
  Route.get('judges', 'V1/Admin/JudgeController.Index');
  Route.get('judge/:id', 'V1/Admin/JudgeController.Show');
  Route.post('judge', 'V1/Admin/JudgeController.Store');
  Route.put('judge/:id', 'V1/Admin/JudgeController.Update');
  Route.delete('judge/:id', 'V1/Admin/JudgeController.Destroy');
  Route.post('judge/:id/images', 'V1/Admin/JudgeController.StoreImage');
  Route.delete('judge/:id/images', 'V1/Admin/JudgeController.DestroyImage');

  // Competitor
  Route.get('event/:idEvent/competitors', 'V1/Admin/CompetitorController.Index');
  Route.get('event/:idEvent/competitor/:id', 'V1/Admin/CompetitorController.Show');
  Route.post('event/:idEvent/competitor', 'V1/Admin/CompetitorController.Store');
  Route.put('event/:idEvent/competitor/:id', 'V1/Admin/CompetitorController.Update');
  Route.delete('event/:idEvent/competitor/:id', 'V1/Admin/CompetitorController.Destroy');
  Route.post('event/:idEvent/competitor/:id/images', 'V1/Admin/CompetitorController.StoreImage');
  Route.delete('event/:idEvent/competitor/:id/images', 'V1/Admin/CompetitorController.DestroyImage');

  // round
  Route.get('event/:idEvent/rounds', 'V1/Admin/RoundController.Index');
  Route.get('event/:idEvent/round/:id', 'V1/Admin/RoundController.Show');
  Route.post('event/:idEvent/round', 'V1/Admin/RoundController.Store');
  Route.put('event/:idEvent/round/:id', 'V1/Admin/RoundController.Update');
  Route.delete('event/:idEvent/round/:id', 'V1/Admin/RoundController.Destroy');

  // group
  Route.get('round/:idRound/groups', 'V1/Admin/GroupController.Index');
  Route.get('round/:idRound/group/:id', 'V1/Admin/GroupController.Show');
  Route.post('round/:idRound/group', 'V1/Admin/GroupController.Store');
  Route.put('round/:idRound/group/:id', 'V1/Admin/GroupController.Update');
  Route.delete('round/:idRound/group/:id', 'V1/Admin/GroupController.Destroy');

  // match
  Route.post('group/:idGroup/matches', 'V1/Admin/MatchController.Store');
};

const Public = () => {
  // match
  Route.post('score', 'V1/Admin/ScoreController.Store');
};

module.exports = { Private, Public };
