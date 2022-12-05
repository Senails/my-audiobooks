export async function getAudioSize(url:string):Promise<number>{
    return new Promise((res)=>{
      let audio = new Audio();
      audio.preload='metadata';
      audio.addEventListener('loadedmetadata',loadedmetadata)
      audio.src = url;

      function loadedmetadata(){
        res(audio.duration);
      }
    })
  }