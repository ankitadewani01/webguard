const chatinput = document.querySelector(".chat-input textarea");
const sendchatbtn= document.querySelector(".chat-input span");
const chatbox= document.querySelector(".chatbox");
let usermessage;
const api_key="YOUR_API_KEY_HERE"; // Replace with your actual API key
const createchatli = (message, classname)=>{
    const chatli = document.createElement("li");
    chatli.classList.add("chat", classname);
    let chatcontent = classname === "outgoing" ?`<p></p>`:`<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatli.innerHTML = chatcontent;
    chatli.querySelector("p").textContent= message;
    return chatli;
}

const generateresponse = (incomingchatli) =>{
    const api_url=`https://openrouter.ai/api/v1/chat/completions`;
    const messageelement=incomingchatli.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${api_key}`,
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{role: "system",content: usermessage}],
        })
    }

    fetch(api_url,requestOptions).then(res => res.json()).then(data=>{
        messageelement.textContent = data.choices[0].message.content;
    }).catch((error)=> {
        messageelement.textContent = "Oops! something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight))
}
const handlechat = () => {
    usermessage = chatinput.value.trim();
    if(!usermessage) return;
    chatinput.value="";
    chatbox.appendChild(createchatli(usermessage,"outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingchatli= createchatli("Thinking...","incoming")
        chatbox.appendChild(incomingchatli);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateresponse(incomingchatli);
    },600)
}
sendchatbtn.addEventListener("click",handlechat);