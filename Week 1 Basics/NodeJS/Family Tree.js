const people = {}
const childOf = function () {
    let parents
    if (this.parents) { parents = this.parents.reduce((res, val) => { res.push(people[val]); return res }, []) }
    return (parents !== undefined) ? parents : "Parents unknown"
}

function createPerson(name, parents) {
    people[Fname] = { name, parents, childOf }
}

const PeopleToCreate = [
    ['Zofia'],
    ['Krysztof'],
    ['Artur', ['Zofia']],
    ['Monika', ['Krysztof']],
    ['Dawid', ['Artur', 'Monika']]
]

PeopleToCreate.forEach(person => {
    createPerson(...person)
});

console.log("-".repeat(20))
console.log(people.Dawid.childOf())
console.log("-".repeat(20))
console.log(people.Dawid.childOf()[0].childOf())
console.log("-".repeat(20))
console.log(people.Dawid.childOf()[0].childOf()[0].childOf())