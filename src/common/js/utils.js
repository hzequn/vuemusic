export function shuffle(list){
	let newList=list.slice();
	for(let i=0;i<newList.length;i++){
		let j=Math.floor(Math.random()*i)
		let t=newList[i];
		newList[i]=newList[j];
		newList[j]=t;
	}
	return newList;
}
