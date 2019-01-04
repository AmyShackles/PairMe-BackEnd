class PM {
  constructor() {
    this.js = []
    this.python = []
    this.react = []
    this.css = []
    this.topics = ['js', 'python', 'react', 'css']
  }
  _remove(topic) {
    const teacher = this[topic].shift()
    for (let i = 0; i < this.topics.length; i++) {
      this[this.topics[i]] = this[this.topics[i]].filter(e => e !== teacher)
    }
    return teacher
  }
  _peek(topic) {
    return this[topic][0] ? true : false
  }
  _add(topics, user) {
    if (topics.length === 0) return this.js.push(user)
    for (let i = 0; i < topics.length; i++) {
      if (this.topics.includes(topics[i].toLowerCase())) {
        this[topics[i].toLowerCase()].push(user)
      }
    }
  }
}

class Student {
  constructor() {
    this.js = []
    this.python = []
    this.react = []
    this.css = []
    this.topics = ['js', 'python', 'react', 'css']
  }
  _remove(topic) {
    return this[topic].shift()
  }
  _peek(topic) {
    return this[topic][0] ? true : false
  }
  _add(topics, user) {
    if (topics.length === 0) return this.js.push(user)
    for (let i = 0; i < topics.length; i++) {
      if (this.topics.includes(topics[i].toLowerCase()))
        this[topics[i].toLowerCase()].push(user)
    }
  }
}

const teacher = new PM()
const student = new Student()

function match(topics) {
  for (let i = 0; i < topics.length; i++) {
    console.log(topics[i])
    if (
      student._peek(topics[i].toLowerCase()) &&
      teacher._peek(topics[i].toLowerCase())
    ) {
      const student_id = student._remove(topics[i])
      const teacher_id = teacher._remove(topics[i])
      return [student_id, teacher_id, topics[i]]
    }
  }
  return []
}

module.exports = {
  teacher,
  student,
  match
}
