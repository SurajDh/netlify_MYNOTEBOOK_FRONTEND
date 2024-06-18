import React from 'react'


export default function filterTag({notes,selectedTagVal}) {
  


const handleUpdateTagValue=(event)=>{
  const tagValue = event.target.value;
  selectedTagVal(tagValue);
}



  const getUniqueTags = (notedata , tagCategory)=>{
    
    const resultdata = notedata.map((element)=>{
      return element[tagCategory];
    })
    return ["All",...new Set(resultdata.sort())]
  }
  
  const tagDataonly = getUniqueTags(notes,"tag");
  
  return (
    <div className='mx-3'>

      Filter Tag: 
      <select id='tagCategory' onChange={handleUpdateTagValue} style={{maxWidth:"7rem"}}>

      {tagDataonly.map((tag)=>{
        return <option key={tag} value={tag} >
          {tag.length>12?tag.slice(0,10)+"...":tag}
        </option>
      })}

      </select>

    </div>
  )
}
