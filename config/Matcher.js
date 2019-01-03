class PM {
  constructor() {
    this.JS = ['@Nando', '@Amy', '@Kai']
    this.python = ['@Nando', '@Amy', '@Kai']
    this.React = ['@Nando', '@Amy', '@Kai']
    this.css = ['@Nando', '@Amy', '@Kai']
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
}

class Student {
  constructor() {
    this.JS = []
    this.python = []
    this.React = ['@Nando']
    this.css = []
    this.topics = ['JS', 'python', 'React', 'css']
  }
  _remove(topic) {
    return this[topic].shift()
  }
  _peek(topic) {
    return this[topic][0]
  }
}

const teacher = new PM()
const student = new Student()

// console.log(teacher, student)
if (student._peek('React') && teacher._peek('React')) {
  student._remove('React') && teacher._remove('React')
}

// console.log(teacher, student)
module.exports = {
  PM,
  Student,
  teacher,
  student
}
