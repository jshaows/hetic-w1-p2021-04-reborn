// var gameInstance = UnityLoader.instantiate("gameContainer", "js/08_Build_1600_900.json");

function SelectMenu(i) {
  gameInstance.SendMessage("GameInterface", "SetMenu", JSON.stringify(i))
}