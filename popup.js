document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("myButton");
  // onClick's logic below:
  button.addEventListener("click", async function () {
    const input = document.getElementById("userInput").value;
    console.log(input);
    const prevSearch = document.getElementById("returned");
    prevSearch && prevSearch.remove();

    try {
      const response = await fetch(
        `https://signlanguage-api.herokuapp.com/video/${input}`
      );
      const jsonBody = await response.json();
      const mp4Source = "https://bslsignbank.ucl.ac.uk" + jsonBody.data.link;

      const vid = document.createElement("video");

      vid.id = "returned";
      vid.setAttribute("autoplay", "");
      vid.setAttribute("muted", "");
      vid.setAttribute("width", "320px");
      vid.setAttribute("src", `${mp4Source}`);
      document.body.appendChild(vid);
    } catch (error) {
      console.log(error);
      const returnedMessage = document.createElement("p");
      returnedMessage.innerHTML = "Could not find the sign for this search.";
      returnedMessage.id = "returned";
      document.body.append(returnedMessage);
    }
  });
});
