import childProcess from 'child_process'

export default class HexoCmd {
  spawn: any = childProcess.spawn
  exec: any = childProcess.exec

  server(_path: string, fn) {
    let server = this.spawn('hexo', ['server'], {cwd: _path})
    server.stdout.on('data', (data) => {
        this.cb(fn, {data: data.toString(), pid: server.pid})
    })
  }

  stop(pid) {
    this.exec('kill ' + pid, (err, stdout) => {
      console.log(stdout)
    })
  }

  newpost(_path: string, name: string, fn) {
    let newPost = this.spawn('hexo', ['new', name], { cwd: _path })
    newPost.stdout.on('data', (data) => {
      this.cb(fn, data)
    })
    newPost.stderr.on('data', (err) => {
      console.log(err.toString())
    })
  }

  private cb(fn: (data: string) => any, data: any) {
    return fn && fn(data.toString())
  }

}
