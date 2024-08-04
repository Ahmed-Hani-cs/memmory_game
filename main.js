let start_btn = document.querySelector(".start-game-btn span");
let user_name = document.querySelector(".info_container .name span");

let duration = 1000;
let blocks_container = document.querySelector(".blocks_container");
let blocks_arr = Array.from(blocks_container.children);
let order_range = [...Array(blocks_arr.length).keys()];
shufl(order_range);

blocks_arr.forEach((block, i) => {
  //set order style properties to block
  block.style.order = order_range[i];
  //add flip class to selcted block
  block.addEventListener("click", function () {
    flipBlock(block);
    endgame(blocks_arr);
  });
});
start_btn.onclick = function () {
  let name = prompt("enter your name");
  // show user name in oage
  name === ""
    ? (user_name.innerHTML = "Unknown")
    : (user_name.innerHTML = name);
  // delete start btn
  document.querySelector(".start-game-btn").remove();
  document.getElementById("start").play();
};

function shufl(arr) {
  let current = arr.length,
    stach,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    stach = arr[current];
    arr[current] = arr[random];
    arr[random] = stach;
  }
  return arr;
}
// -**********************
// FLIP ITEM FUNCTION
function flipBlock(selectBlock) {
  // add flip class to block
  selectBlock.classList.add("is-flip");
  //collect all flip card
  let all_flip_block = blocks_arr.filter((block) =>
    block.classList.contains("is-flip")
  );

  if (all_flip_block.length === 2) {
    stop_click();
    // run check match blocks function
    check_match_blocks(all_flip_block[0], all_flip_block[1]);
  }
}
// STOP CLICKING FUNCTION
function stop_click() {
  blocks_container.classList.add("stop_click");
  setTimeout(function () {
    blocks_container.classList.remove("stop_click");
  }, duration);
}
//check matvh block
function check_match_blocks(firstBlock, secondBlock) {
  let tries = document.querySelector(".tries span");
  if (firstBlock.dataset.set === secondBlock.dataset.set) {
    // remove is flip class
    firstBlock.classList.remove("is-flip");
    secondBlock.classList.remove("is-flip");

    // add is_match class
    firstBlock.classList.add("is-match");
    secondBlock.classList.add("is-match");

    //play audio success
    document.getElementById("success").play();
  } else {
    setTimeout(() => {
      firstBlock.classList.remove("is-flip");
      secondBlock.classList.remove("is-flip");
      tries.innerHTML = parseInt(tries.innerHTML) + 1;
    }, duration);
    document.getElementById("wrong").play();
  }
}
function endgame(allBlocks) {
  let count = 0;
  allBlocks.le
  allBlocks.forEach((ele) => {
    if (ele.classList.contains("is-match")) {
      count++;
    }
    if (count == allBlocks.length) {
        let score = document.getElementsByClassName("info_container")[0];
        let tries_count = document.getElementsByClassName("tries")[0];
        score.style.background="#000";
        score.style.color="#fff";
        let btn = document.createElement("button");
        btn.innerHTML = "Play again";
        btn.style.background="green";
        btn.style.color="white";
        btn.style.border="none";
        btn.style.width="100px";
        btn.style.height="40px";
        btn.style.borderRadius="10px";
        btn.style.cursor="pointer";
        btn.style.position="absolute";
        btn.style.top="50%";
        btn.style.left="50%";
        btn.style.translate="-50% -50%";
        btn.addEventListener('click', ()=>{location.reload()});
        score.appendChild(btn);
        score.appendBefore(btn,tries_count)

    }
  });
}
endgame(blocks_arr);
