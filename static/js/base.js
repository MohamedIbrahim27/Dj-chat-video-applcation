const APP_ID = '6b2d0d61dfae4697942732d1252a9823'
const CHANNEL = 'mhgts'
const TOKEN = '0066b2d0d61dfae4697942732d1252a9823IABMBk/3VEPR10BCzGjrvzC/KbvkqYQutN9+yLZs88RQ69za1Zb44TCmIgAGc7EAAd9YZQQAAQAB31hlAgAB31hlAwAB31hlBAAB31hl'
const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'});
let UID =14;
let localTracks = []
let remoteUsers = {}
let joinAndDisplayLocalStream = async() => {
    client.on('user-published', handelUserJoined )
    client.on('user-left', handelUserLeft )
    UID = await client.join(APP_ID,CHANNEL,TOKEN,null)
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="username-wrapper">
                            <span class="user-name">my name : </span>
                        </div>
                        <div class="video-player" id="user-${UID}"></div>
                    </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)
    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0],localTracks[1]])
}
let handelUserJoined =async (user,mediaType) =>{
    remoteUsers[user.uid] =user 
    await client.subscribe(user,mediaType)
    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.UID}`)
        if (player !=null){
            player.remove()
        }
        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="username-wrapper">
                            <span class="user-name">my name : </span>
                        </div>
                        <div class="video-player" id="user-${user.uid}"></div>
                    </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)
        user.videoTrack.play(`user-${user.uid}`)
    }
    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handelUserLeft =async(user) =>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream =async() =>{
    for (let i= 0;localTracks.length>i;i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.leave()
    window.open('/home','_self')
}
let toggelCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor ='#fff'
    }else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80 , 80 , 1)'

    }
}
let toggelMic = async (e) => {
    if(localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor ='#fff'
    }else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor ='rgb(255, 80 , 80 , 1)'
    }
}



joinAndDisplayLocalStream()
document.getElementById('leave-btn').addEventListener('click',leaveAndRemoveLocalStream)
document.getElementById('video-btn').addEventListener('click',toggelCamera)
document.getElementById('microphone-btn').addEventListener('click',toggelMic)
