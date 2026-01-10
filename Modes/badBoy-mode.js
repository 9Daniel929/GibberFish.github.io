//Mine may be a little diffrent than yours so you can change it a bit.
var pageBefore = document.getElementById("page");
document.body.innerHTML = "";
document.body.style.backgroundImage = "url('https://img.freepik.com/premium-photo/cracked-wall-background-cracked-dry-ground_553949-249.jpg')";
const Modtitle = document.createElement("h1");
Modtitle.textContent = "BAD BOY";
Modtitle.style.textAlign = "center";
Modtitle.style.fontSize = "50px";
Modtitle.style.fontFamily = "Impact";
Modtitle.style.color = "red";
const ModtitleDes = document.createElement("h1");
ModtitleDes.textContent = "An added Gibberfish mod by Ian";
ModtitleDes.style.textAlign = "center";
ModtitleDes.style.color = "white";
const ModDisableWrap = document.createElement("div"); //Adult
ModDisableWrap.align = "center";
const ModDisable = document.createElement("img");
ModDisable.src = "Assets/Badboy_disable.png";
ModDisable.width = "100";
ModDisable.height = "100";
ModDisable.onclick = function() {
  document.body.innerHTML = pageBefore;
};
/*Reminder for Me
Put output above the console but still in the console wrap.
*/
const ModConsoleWrap = document.createElement("div"); //Adult
ModConsoleWrap.align = "center";
//Measure a good font size for ModConsoleOutput
//Actually, I think it's already good.
const ModConsoleOutput = document.createElement("p");
ModConsoleOutput.style = "background-color: black; color: white; font-family: Monospace;";
ModConsoleOutput.innerHTML = "No commands detected... <p>Find Commands at <!--Put a github link there.--></p>";
const ModConsoleLine = document.createElement("p"); //Adult
const ModConsole = document.createElement("input");
ModConsole.type = "text";
ModConsole.style = "background-color: black; color: white; font-family: Monospace;";
const ModConsoleGO = document.createElement("input");
ModConsoleGO.type = "submit";
ModConsoleGO.value = "Run";
ModConsoleGO.style = "background-color: black; color: white; font-family: Monospace;";
ModConsoleGo.onclick = function() {}; //Make a list of commands first.

document.body.appendChild(Modtitle);
document.body.appendChild(ModtitleDes);
document.body.appendChild(ModDisableWrap);
ModDisableWrap.appendChild(ModDisable);
document.body.appendChild(ModConsoleWrap);
ModConsoleWrap.appendChild(ModConsoleOutput);
ModConsoleWrap.appendChild(ModConsoleLine);
ModConsoleLine.appendChild(ModConsole);
ModConsoleLine.appendChild(ModConsoleGO);

//In Progress
