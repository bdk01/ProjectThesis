let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item
    )
    return newData;
}

const SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
        /* console.log(user) */
    })

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id)
        if(data){
            const clients = users.filter(user => 
                data.followers.find(item => item._id === user.id)
            )

            if(clients.length > 0){
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                })
            }

           
        }
        console.log('dis')
        users = users.filter(user => user.socketId !== socket.id)
    })


    // Likes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
    
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
      
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })


    // Comments
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })


    // Follow
    socket.on('follow', newUser => {
      
        const user = users.find(user => user.id === newUser._id)
       
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })


    // Notification
    socket.on('createNotify', msg => {
      console.log('createnoti')
        const client = users.find(user => msg.recipients.includes(user.id))
    console.log(client)
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)

    })


    // Message
    socket.on('addMessage', ({msg,auth,people}) => {
       
   /*      const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg) */
     /*    const clients = users.filter(user => ids.includes(user.id)) */
    
     
         const clients = users.filter(user => people.includes(user.id))
        
        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('addMessageToClient',{msg,authuser:auth,people})
            })
        }
    })

    socket.on('checkUserOnline', data => {
      const following = users.filter(user => 
          data.following.find(item => item._id === user.id)
      )
      console.log('following')
      console.log(following)
      socket.emit('checkUserOnlineToMe', following)

      const clients = users.filter(user => 
          data.followers.find(item => item._id === user.id)
      )

          console.log('clients')
          console.log(clients)
      if(clients.length > 0){
          clients.forEach(client => {
              socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
          })
      }
      
  })



   
}

module.exports = SocketServer
