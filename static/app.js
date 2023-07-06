async function editmemo(event) {
  const id = event.target.dataset.id;
  const editinput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editinput,
    }),
  });
  readmemo();
}

async function deletememo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readmemo();
}
function displaymemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editmemo);
  editBtn.dataset.id = memo.id;

  const delbtn = document.createElement("button");
  delbtn.innerText = "삭제";
  delbtn.addEventListener("click", deletememo);
  delbtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delbtn);
  ul.appendChild(li);
}

async function readmemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displaymemo);
}

async function creatememo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readmemo();
}

function handlesubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  creatememo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handlesubmit);

readmemo();
