import React, { useState } from 'react'
import attachment_icon from '../../assets/icons/elements_icon/attachment.png'
import checkbox_icon from '../../assets/icons/elements_icon/checkbox.png'
import date_icon from '../../assets/icons/elements_icon/date.png'
import dateAndTime_icon from '../../assets/icons/elements_icon/dateAndTime.png'
import divider_icon from '../../assets/icons/elements_icon/divider.png'
import dropdown_icon from '../../assets/icons/elements_icon/dropdown.png'
import number_icon from '../../assets/icons/elements_icon/number.png'
import singleLine_icon from '../../assets/icons/elements_icon/singleLine.png'
import switch_icon from '../../assets/icons/elements_icon/switch.png'
import textArea_icon from '../../assets/icons/elements_icon/textArea.png'
import radioButton_icon from '../../assets/icons/elements_icon/radioButton.png'
import image_icon from '../../assets/icons/elements_icon/image.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import uuid from 'uuid/v4'

import styled from 'styled-components'

const Elements = (props) => {
  const elementList = [
    {
      type: 'Text Elements',
      elements: [
        {
          index: 1,
          id: uuid(),
          name: 'Single Line',
          icon: singleLine_icon,
        },
        {
          index: 2,
          id: uuid(),
          name: 'Text Area',
          icon: textArea_icon,
        },
        {
          index: 3,
          id: uuid(),
          name: 'Number',
          icon: number_icon,
        },
      ],
    },
    {
      type: 'Date Elements',
      elements: [
        {
          index: 4,
          id: uuid(),
          name: 'Date',
          icon: date_icon,
        },
        {
          index: 5,
          id: uuid(),
          name: 'Date & Time',
          icon: dateAndTime_icon,
        },
      ],
    },

    {
      type: 'Multi Elements',
      elements: [
        { index: 6, id: uuid(), name: 'Dropdown', icon: dropdown_icon },
        {
          index: 7,
          id: uuid(),
          name: 'Radio Button',
          icon: radioButton_icon,
        },
        {
          index: 8,
          id: uuid(),
          name: 'Checkbox',
          icon: checkbox_icon,
        },
        {
          index: 9,
          id: uuid(),
          name: 'Switch',
          icon: switch_icon,
        },
      ],
    },

    {
      type: 'Media Elements',
      elements: [
        {
          index: 10,
          id: uuid(),
          name: 'Image',
          icon: image_icon,
        },
        {
          index: 11,
          id: uuid(),
          name: 'Attachment',
          icon: attachment_icon,
        },
      ],
    },
    {
      type: 'Other Elements',
      elements: [
        {
          index: 12,
          id: uuid(),
          name: 'Divider',
          icon: divider_icon,
        },
      ],
    },
  ]
  const allElements = props.allElements

  // elementList.forEach((category) => {
  //   category.elements.forEach((element) => {
  //     allElements.push(element)
  //   })
  // })
  console.log({ allElements })
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
