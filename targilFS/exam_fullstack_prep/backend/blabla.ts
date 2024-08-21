let favorites = [{'fid':1}, {'fid':5}, {'fid':8}, {'fid':4}];

let vacations = [
  {
    'id': 1,
    'name': 'eilat',
  },
  {
    'id': 2,
    'name': 'sdfg',
  },
  {
    'id': 3,
    'name': 'gsg',
  },
  {
    'id': 4,
    'name': 'sdfg',
  },
  {
    'id': 5,
    'name': 'dsfg',
  },
  {
    'id': 6,
    'name': 'gdsg',
  },
  {
    'id': 7,
    'name': 'gg',
  },
  {
    'id': 8,
    'name': 'kk',
  },
];
/*
for(let i=0;i<favorites.length;i++){
    let favVac = vacations.filter((vac) => vac.id === favorites[i].fid);
    console.log('favVac:', favVac);

}
*/
console.log(vacations)
for(let i=0;i<favorites.length;i++){
    for(let j=0; j<vacations.length; j++){
        if(favorites[i].fid===vacations[j].id){
            //console.log(favorites[i].fid,vacations[j].id )
            Object.assign(vacations[j],{isFavorite: true})
        }
    }
   

}
console.log(vacations)