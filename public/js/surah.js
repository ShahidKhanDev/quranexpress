// Get the surah id from the request
const currentPath = window.location.pathname;
const surahId = currentPath.substring(1);

if (surahId <= 114) {
  console.log("surah: " + surahId);
  //   document.querySelector("title").innerHTML = "yesss";
} else {
  //   document.querySelector("title").innerHTML = "noooo";
  console.log("surah does not exist");
}
