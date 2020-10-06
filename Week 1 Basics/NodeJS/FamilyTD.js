const family = {}
const childOf = function() { return this.parents.map(parent => parent.name).join(' & ') || "Parents Unknown" }
family.richard = {name: 'Richard', parents:[], childOf}
family.may = {name: 'May', parents:[],childOf}
family.peter = {name: 'Peter', parents:[family.richard], childOf}
family.john = {name:'John', parents:[family.peter, family.may],childOf}

module.exports = family