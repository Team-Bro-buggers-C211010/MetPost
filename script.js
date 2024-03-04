const loadData = async(category)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
const data = await response.json();
const posts = data.posts; // data ekta object jekane posts and messaes ache
// data.posts means posts key jeta actullay ekta array ta access kora

const letsDiscussPostContainer = document.getElementById('postContainer');
    /// clear the container at the biginning of the load.
    letsDiscussPostContainer.innerHTML = "";
const load = document.getElementById('loader');
load.classList.remove('hidden');
setTimeout(()=>{
    displayPosts(posts);
    load.classList.add('hidden');
},2000);
}

const displayPosts = posts => {
    const letsDiscussPostContainer = document.getElementById('postContainer');
    /// clear the container at the biginning of the load.
    letsDiscussPostContainer.innerHTML = "";
    posts.forEach(post =>{
        
        const activeStatus = post.isActive;
        let color;
        if(activeStatus){
            color = "#10B981";
        }
        else {
            color = "#FF3434"
        }
        const postCard =document.createElement('div');
        postCard.classList =`bg-[#F3F3F5] w-full p-10 rounded-3xl flex gap-x-6 gap-y-4 flex-col md:flex-row card`;
        postCard.innerHTML= `
        <div
                class="bg-white w-20 h-20 rounded-2xl bg-[url('${post.image}')] bg-cover bg-no-repeat relative"
              >
                <div
                  class="rounded-full bg-[${color}] w-5 h-5 absolute -right-1 -top-1"
                ></div>
              </div>
              <div>
                <div class="flex gap-5 text-[#12132DCC] fontInter text-sm mb-3">
                  <p>#${post.category}</p>
                  <p>Author : ${post.author.name}</p>
                </div>
                <h1 class="text-[#12132D] text-lg md:text-xl font-bold fontMulish mb-4 max-w-[569px] md:w-[569px]">${post.title}</h1>
                <p class="text-[#12132D99] text-base font-normal mb-5">
                  ${post.description}
                </p>
                <hr class="border-dashed"/>
                <div class="flex justify-between mt-5">
                  <div class="flex gap-x-2 md:gap-x-6 items-center text-sm md:text-base">
                    <div class="flex gap-x-1 md:gap-x-3 items-center">
                      <img src="./images/comment.png" alt="" />
                      <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-x-1 md:gap-x-3 items-center">
                      <img src="./images/views.png" alt="" />
                      <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-x-1 md:gap-x-3 items-center">
                      <img src="./images/times.png" alt="" />
                      <p>${post.posted_time} min</p>
                    </div>
                  </div>
                  <a id='${post.id}' onclick="addTitle(${post.id})"><img src="./images/email 1.png" alt=""></a>
                  </div>
                  </div>
                  <div>
                </div>
        `;
        letsDiscussPostContainer.appendChild(postCard);
    })
}

const loadLatestPostData = async() => {
    const response =await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
const data = await response.json();
displayLatestPosts(data);
}

const displayLatestPosts = data => {
    const latestPostContainer = document.getElementById("latestPostContain");
    data.forEach(post =>{
        console.log(post);
        let designation,date;
        if(post.author.designation === undefined)
        {
            designation = "Unknown";
        }
        else 
        {
            designation = post.author.designation;
        }
        if(post.author.posted_date === undefined){
            date = "No publish date";
        }
        else 
        {
            date = post.author.posted_date;
        }
        const latestCard = document.createElement("div");
        latestCard.classList = `card max-w-96 bg-white shadow-xl border border-[#12132D26] p-6`;
        latestCard.innerHTML = `
        <figure><img class="rounded-3xl" src="${post.cover_image}" alt="Shoes" /></figure>
            <div>
              <div class="flex gap-x-2 mt-6 mb-3"><img src="./images/calender.png" alt=""><p class="fontMulish text-[#12132D99]">${date}</p></div>
              <h2 class="mb-3 text-[#12132D] text-lg font-extrabold fontMulish">${post.title}</h2>
              <p class="mb-4 text-[#12132D] fontMulish">${post.description}</p>
              <div class="flex gap-x-4"><img class="w-11 h-11 rounded-full" src="${post.profile_image}" alt=""> <div><h3 class="fontMulish font-bold text-[#12132D]">${post.author.name}</h3>
              <p class="fontMulish text-sm text-[#12132D99]">${designation}</p></div></div>
            </div>
        `;
        latestPostContainer.appendChild(latestCard);
    });
}

loadLatestPostData();

let counter = 0;
const addTitle = async(id)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
const data = await response.json();
const posts = data.posts; // data ekta object jekane posts and messaes ache
// data.posts means posts key jeta actullay ekta array ta access kora
const titleContainer =document.getElementById('titleContainer');
posts.forEach(post=>{
    if(post.id == id){
        counter++;
        const titleDiv = document.createElement('div');
        titleDiv.classList = `flex justify-between bg-white rounded-2xl p-4 mb-4`;
        titleDiv.innerHTML=`
        <div><h1>${post.title}</h1></div>
        <div class="flex items-center gap-2 mx-4"><img src="./images/views.png" alt=""><p>${post.view_count}</p></div>
        `;
        setReadCounter();
        titleContainer.appendChild(titleDiv);
    }
})
} 

function loadDataBasedCategory(){
    const searchCategory = document.getElementById("inputCoupon").value;
    document.getElementById("inputCoupon").value="";
    loadData(searchCategory);
    const titleContainer =document.getElementById('titleContainer');
    titleContainer.innerHTML = "";
    counter = 0;
    setReadCounter()
}

document.getElementById("apply").addEventListener("click", function() {
    loadDataBasedCategory();
});

function setReadCounter(){
    const countRead = document.getElementById('addToTitleCount');
    countRead.innerHTML = counter;
}
loadData("");

