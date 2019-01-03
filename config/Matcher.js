class PM {
  constructor() {
    this.JS = []
    this.python = []
    this.React = []
    this.css = []
    this.topics = ['JS', 'python', 'React', 'css']
  }
  _remove(topic) {
    const teacher = this[topic].shift()
    for (let i = 0; i < this.topics.length; i++) {
      this[this.topics[i]] = this[this.topics[i]].filter(e => e !== teacher)
      console.log(this[this.topics[i]])
    }
    return teacher
  }
  _peek(topic) {
    return this[topic][0]
  }
  _add(topics, user) {
    if (topics.length === 0) return this.JS.push(user)
    for (let i = 0; i < topics.length; i++) {
      if (topics[i] in this.topics) this[topics[i]].push(user)
    }
  }
}

class Student {
  constructor() {
    this.JS = []
    this.python = []
    this.React = []
    this.css = []
    this.topics = ['JS', 'python', 'React', 'css']
  }
  _remove(topic) {
    return this[topic].shift()
  }
  _peek(topic) {
    return this[topic][0]
  }
  _add(topics, user) {
    if (topics.length === 0) return this.JS.push(user)
    for (let i = 0; i < topics.length; i++) {
      if (topics[i] in this.topics) this[topics[i]].push(user)
    }
  }
}

const teacher = new PM()
const student = new Student()

function match(topics) {
  topics.forEach(topic => {
    if (student._peek(topic) && teacher._peek(topic)) {
      const student_id = student._remove(topic)
      const teacher_id = teacher._remove(topic)
      return [student_id, teacher_id]
    } else {
      return false
    }
  })
}

module.exports = {
  teacher,
  student,
  match
}
