//Get visible recommendations
export default  (recommendations, {tags1,tags2,tags3,tags4,sortBy}) => { 
    
    console.log('filtersFunc tag1 tag2', tags1, tags2);
    console.log('filtersFunc recommendations',  recommendations);
    return recommendations.filter((recommendation) => {
        // P.Z: Again it's copied code that can be replaced by with a function so it'll be more readable and
        // easy to change.
        // This function can be replaced with:
        // const tagsLists = [tags1, tags2, tags3, tags4]
        // return tagsLists.every(tagList => !tagsLists.length || tagsLists.some(tag => recommendation[tagsLists]includes(tag))
        //
        // In addition, I would rename the tagsX in a more specific name.
            const tags1Match = (tags1.length>0) ? tags1.some(tag => recommendation.tags1.includes(tag)) : true;//return true if at least one of the tags to filter by exist in the recommendation tags
            const tags2Match = (tags2.length>0) ? tags2.some(tag => recommendation.tags2.includes(tag)) : true;
            const tags3Match = (tags3.length>0) ? tags3.some(tag => recommendation.tags3.includes(tag)) : true;
            const tags4Match = (tags4.length>0) ? tags4.some(tag => recommendation.tags4.includes(tag)) : true;

            console.log('----filtersFunc: tags1Match, tags2Match, tags3Match, tags4Match: ', tags1Match, tags2Match, tags3Match, tags4Match);
            return tags1Match && tags2Match && tags3Match && tags4Match
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //1=> b comes first, -1=>a comes first
        } else if (sortBy === 'price') {
            return a.amount < b.amount ? 1 : -1 ;
        }
    });
};