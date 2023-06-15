
/*      https://github.com/D3vd/Meme_Api to get API        
        https://meme-api.com/gimme/wholesomememes - Link of actual automated memes  
          You will note; we made declarations for not only image but also title and author   */


     /*    Here we are referencing the meme button, image, title, and author*/
const generateMemeBtn = document.querySelector(
    ".meme-generator .generate-meme-btn"
    );
const memeImage = document.querySelector(".meme-generator img");
const memeTitle = document.querySelector(".meme-generator .meme-title");
const memeAuthor = document.querySelector(".meme-generator .meme-author");



const updateDetails = (url, title, author) => { /* using we values from the generateMeme funcion*/ 
    memeImage.setAttribute("src", url);         /* url value */    
    memeTitle.innerHTML = title;                    /* Title value */  
    memeAuthor.innerHTML = `Meme by: ${author}`;    /* Author value I added 'Meme by:' */  
}


     /* This is the function the button was'listening' for.
            the function name is --- 'generateMeme'  
            it 

            
            */
const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")  /* fetches the API to get the response from the API.*/
        .then((dan) => dan.json())            /* then gets the reponse in json format.   */
        .then((dan1) => {
            updateDetails(dan1.url, dan1.title, dan1.author) /* we are using updateDetails as an
                variable or array to pass in the url, title, and author values*/
        })
}


/*  -- This 'listens' for when the button is pushed. Once its pushed it will run the funciton generateMeme */
generateMemeBtn.addEventListener('click', generateMeme); 
