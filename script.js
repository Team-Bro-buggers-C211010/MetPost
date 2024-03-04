const loadData = async(category)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
const data = await response.json();
const posts = data.posts; // data ekta object jekane posts and messaes ache
// data.posts means posts key jeta actullay ekta array ta access kora
displayPosts(posts);
}
const displayPosts = posts => {

    const letsDiscussPostContainer = document.getElementById('postContainer');
    /// clear the container at the biginning of the load.
    letsDiscussPostContainer.innerHTML = "";
    posts.forEach(post =>{
        console.log(post);
        const activeStatus = post.isActive;
        let color;
        if(activeStatus){
            color = "#10B981";
        }
        else {
            color = "#FF3434"
        }
        const postCard =document.createElement('div');
        postCard.classList =`bg-[#F3F3F5] w-full p-10 rounded-3xl flex gap-x-6 gap-y-4 flex-col md:flex-row`;
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
                <h1 class="text-[#12132D] text-lg md:text-xl font-bold fontMulish mb-4">${post.title}</h1>
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
                  <img src="./images/email 1.png" alt="">
                  </div>
                  </div>
                  <div>
                </div>
        `;
        letsDiscussPostContainer.appendChild(postCard);
    })
}
loadData("");