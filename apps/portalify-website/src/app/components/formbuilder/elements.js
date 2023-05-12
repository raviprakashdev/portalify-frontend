import React, { useState, useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { UserContext } from '../../context/formbuilder-context'

import styled from 'styled-components'

const Elements = (props) => {
  const { elementList, allElements } = useContext(UserContext)

  // const allElements = props.allElements

  const Item = styled.div``
  const List = styled.div``

  const Kiosk = styled(List)`
    width: auto;
  `
  const Clone = styled(Item)`
    + div {
      display: none !important;
    }
  `

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredElements, setFilteredElements] = useState(elementList)

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
    const filtered = elementList.filter((category) => {
      return (
        category.elements.filter((element) => {
          return (
            element.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
            category.type.toLowerCase().includes(event.target.value.toLowerCase())
          )
        }).length > 0
      )
    })
    setFilteredElements(filtered)
  }

  const filteredElementList = filteredElements.map((category, indexOut) => {
    return (
      <>
        <div className="element_heading">{category.type}</div>
        <div className="element_list row">
          {category.elements
            .filter((element) => {
              return (
                element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.type.toLowerCase().includes(searchQuery.toLowerCase())
              )
            })
            .map((element, index) => (
              <div className="col-md-6 col-sm-12">
                {console.log('keyyy', element.id, index, indexOut, element.index)}

                <Draggable key={element.id} draggableId={element.id} index={element.index - 1}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {' '}
                        {console.log(element)}
                        <div key={element.id} className="element_group">
                          <div className="element_icon">
                            <img src={element.icon} alt={element.name} />
                          </div>
                          <div className="element_name">{element.name}</div>
                        </div>
                      </Item>
                      {snapshot.isDragging && (
                        <Clone>
                          <div key={element.id} className="element_group">
                            <div className="element_icon">
                              <img src={element.icon} alt={element.name} />
                            </div>
                            <div className="element_name">{element.name}</div>
                          </div>
                        </Clone>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              </div>
            ))}
        </div>
      </>
    )
  })

  return (
    <div>
      <div className="search-header">
        <input type="text" value={searchQuery} placeholder="Search" onChange={handleSearchInputChange} />
      </div>
      <Droppable droppableId="allElements" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {filteredElementList}
          </Kiosk>
        )}
      </Droppable>
    </div>
  )
}

export default Elements
