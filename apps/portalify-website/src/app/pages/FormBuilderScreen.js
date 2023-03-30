import React, { useState } from 'react'
import TopBar from '../components/formbuilder/topBar'
import Elements from '../components/formbuilder/elements'
import SingleLineInputProperty from '../components/formbuilder/singleLineInputProperty'
import attachment_icon from '../assets/icons/elements_icon/attachment.png'
import checkbox_icon from '../assets/icons/elements_icon/checkbox.png'
import date_icon from '../assets/icons/elements_icon/date.png'
import dateAndTime_icon from '../assets/icons/elements_icon/dateAndTime.png'
import divider_icon from '../assets/icons/elements_icon/divider.png'
import dropdown_icon from '../assets/icons/elements_icon/dropdown.png'
import number_icon from '../assets/icons/elements_icon/number.png'
import singleLine_icon from '../assets/icons/elements_icon/singleLine.png'
import switch_icon from '../assets/icons/elements_icon/switch.png'
import textArea_icon from '../assets/icons/elements_icon/textArea.png'
import radioButton_icon from '../assets/icons/elements_icon/radioButton.png'
import image_icon from '../assets/icons/elements_icon/image.png'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// a little function to help us with reordering the result
const elementList = [
  {
    type: 'Text Elements',
    elements: [
      {
        index:1,
        id: uuid(),
        name: 'Single Line',
        icon: singleLine_icon,
        //html content
      },
      {
        index:2,
        id: uuid(),
        name: 'Text Area',
        icon: textArea_icon,
      },
      {
        index:3,
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
        index:4,
        id: uuid(),
        name: 'Date',
        icon: date_icon,
      },
      {
        index:5,
        id: uuid(),
        name: 'Date & Time',
        icon: dateAndTime_icon,
      },
    ],
  },

  {
    type: 'Multi Elements',
    elements: [
      {index:6,
        id: uuid(),
        name: 'Dropdown',
        icon: dropdown_icon,
      },
      {
        index:7,
        id: uuid(),
        name: 'Radio Button',
        icon: radioButton_icon,
      },
      {
        index:8,
        id: uuid(),
        name: 'Checkbox',
        icon: checkbox_icon,
      },
      {
        index:9,
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
        index:10,
        id: uuid(),
        name: 'Image',
        icon: image_icon,
      },
      {
        index:11,
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
        index:12,
        id: uuid(),
        name: 'Divider',
        icon: divider_icon,
      },
    ],
  },
]
const allElements = []

elementList.forEach((category) => {
  category.elements.forEach((element) => {
    allElements.push(element)
  })
})
console.log(allElements)
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log('==> dest', destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Content = styled.div`
  margin-right: 200px;
`

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${(props) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`
const ITEMS = [
  {
    id: uuid(),
    content: 'Headline',
  },
  {
    id: uuid(),
    content: 'Copy',
  },
  {
    id: uuid(),
    content: 'Image',
  },
  {
    id: uuid(),
    content: 'Slideshow',
  },
  {
    id: uuid(),
    content: 'Quote',
  },
]
const Clone = styled(Item)`
  + div {
    display: none !important;
  }
`

const Handle = styled.div``

const List = styled.div`
  border: 1px ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
  background: #ccc;
`

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`

const ButtonText = styled.div`
  margin: 0 1rem;
`

const FormBuilderScreen = () => {
  const [state, setState] = useState({
    [uuid()]: [],
  })
  const [stateData, setStateData] = useState({
    [uuid()]: [],
  })

  const onDragEnd = (result) => {
    const { source, destination } = result
    console.log("state",state)

    console.log('==> result', result)

    // dropped outside the list
    if (!destination) {
      return
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState({
          [destination.droppableId]: reorder(state[source.droppableId], source.index, destination.index),
        })
        break
      case 'allElements':
        setState({
          [destination.droppableId]: copy(allElements, state[destination.droppableId], source, destination),
        })
        break
      default:
        setState(move(state[source.droppableId], state[destination.droppableId], source, destination))
        break
    }
  }

  const addList = (e) => {
    setState({
      ...state,
      [uuid()]: [],
    })
  }
  return (
    <section className="formbuilder-screen">
      <div className="container">
        <TopBar />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row ">
            <div className="col-3 elementList">
              <Elements dataElement = {allElements}/>
            </div>
            <div className="col-6">
              Main Area
              <Content>
                <Button onClick={addList}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  <ButtonText>Add List</ButtonText>
                </Button>

                {Object.keys(state).map((list, i) => {
                  console.log('==> list', list)
                  return (
                    <Droppable key="allElements" droppableId={list}>
                      {(provided, snapshot) => (
                        <Container ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                          {state[list].length
                            ? state[list].map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => (
                                    <Item
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      isDragging={snapshot.isDragging}
                                      style={provided.draggableProps.style}
                                    >
                                      <Handle {...provided.dragHandleProps}>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                          <path
                                            fill="currentColor"
                                            d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                          />
                                        </svg>
                                      </Handle>
                                      {console.log(item)}
                                      {item.name}
                                    </Item>
                                  )}
                                </Draggable>
                              ))
                            : !provided.placeholder && <Notice>Drop items here</Notice>}
                          {provided.placeholder}
                        </Container>
                      )}
                    </Droppable>
                  )
                })}
              </Content>
            </div>
            <div className="col-3 inputProperties">
              <p>INPUT PROPERTIES</p> <SingleLineInputProperty />
            </div>
          </div>
        </DragDropContext>
      </div>
    </section>
  )
}

export default FormBuilderScreen
