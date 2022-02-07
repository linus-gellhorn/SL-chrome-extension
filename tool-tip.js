const template = document.createElement("template");
template.innerHTML = `
    <style>
    /* Tooltip container */
    .tooltip-a,
    .tooltip-b {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black; /* Dots under the hoverable text */
    }
    
    /* Tooltip text */
    .tooltip-a .tooltiptext-a,
    .tooltip-b .tooltiptext-b {
      visibility: hidden;
      width: 120px;
      color: #fff;
      text-align: center;
    
      /* Position the tooltip text */
      position: absolute;
      z-index: 999;
    }
    
    /* Above (if element is at middle or bottom of page) */
    .tooltip-a .tooltiptext-a {
      width: 320px;
      bottom: 100%;
      left: 50%;
      margin-left: -160px; /* Need to use half of the width to center the tooltip */
      margin-bottom: 5px;
    }
    
    /* Below (if element is at top of page) */
    .tooltip-b .tooltiptext-b {
      width: 320px;
      top: 100%;
      left: 50%;
      margin-left: -160px;
      margin-top: 5px;
    }
    
    /* Show the tooltip text when you mouse over the tooltip container */
    .tooltip-a:hover .tooltiptext-a,
    .tooltip-b:hover .tooltiptext-b {
      visibility: visible;
    }
    
    .video-mask {
      border: solid black 3px;
      border-radius: 10px;
      overflow: hidden;
      margin: 0;
      font-size: 0; /* To remove weird default margin on video elements */
    }
    
    /* In dire need of making prettier */
    .words {
      background-color: white;
      color: black;
      border-top: solid black 3px;
      margin: 0 !important;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-size: medium;
      padding: 5px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }		
    
    #word {
      margin: 0;
    }
    
    </style>
    <mark>
      <p id='word'></p>
        <span>
            <div class="video-mask">
                <video
                    autoplay
                    muted
                    loop
                    width="320px"
                    src=""
                ></video>
                <p class="words">
                    <b></b>
                </p>
            </div>
        </span>
    </mark>
`;

class ToolTip extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("video").src = this.getAttribute("src");
    this.shadowRoot.querySelector(".words").innerHTML =
      this.getAttribute("words");
    this.shadowRoot.getElementById("word").innerText =
      this.getAttribute("word");
    this.shadowRoot
      .querySelector("mark")
      .setAttribute("class", this.getAttribute("mark-class"));
    this.shadowRoot
      .querySelector("span")
      .setAttribute("class", this.getAttribute("span-class"));
  }
}

window.customElements.define("tool-tip", ToolTip);