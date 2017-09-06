import childProcess from 'child_process'
var spawn = childProcess.spawn

export const SERVER = () => {
  let server = spawn('hexo', ['server'])
  server.stdout.on('data', (data) => {
    console.log(data)
  })
}

export const NEWPOST = (name) => {
  let newPost = spawn('hexo', ['new', name])
  newPost.stdout.on('data', (data) => {
    console.log(data)
  })
}
