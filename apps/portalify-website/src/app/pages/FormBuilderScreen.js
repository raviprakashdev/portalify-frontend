import React, { useState } from 'react'
import TopBar from '../components/formbuilder/topBar'
import Elements from '../components/formbuilder/elements'
import SingleLineInputProperty from '../components/formbuilder/singleLineInputProperty'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { UserContext } from '../context/formbuilder-context'
import { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import cross_icon from '../assets/icons/cross_icon.png'
import StylingProperty from '../components/formbuilder/stylingProperty'

// a little function to help us with reordering the result

const FormBuilderScreen = () => {
  const {
    elementList,
    allElements,
    selectedElement,
    setSelectedElement,
    state,
    setState,
    setElementType,
    elementType,
    setElementTypeName,
  } = useContext(UserContext)

  elementList.forEach((category) => {
    category.elements.forEach((element) => {
      allElements.push(element)
    })
  })
  //console.log(allElements)
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
    // console.log('==> dest', destination)

    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const item = sourceClone[droppableSource.index]

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() })
    return destClone
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }

  const Content = styled.div`
    // margin-right: 200px;
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
    position: relative;
    width: 100%;
    border: 1px ${(props) => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
  `

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

  const [stateData, setStateData] = useState({
    [uuid()]: [],
  })

  const onDragEnd = (result) => {
    const { source, destination } = result
    //console.log('state check', state)

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
          ...state,
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

  //----selecting element by ID and updating the value---

  const handleElementClick = (elementid, listid) => {
    setSelectedElement([listid, elementid])
  }

  const getElementType = () => {
    //getting selected element type

    var index = -1
    const key = selectedElement[0]
    const idToFind = selectedElement[1]
    const dataArray = state[key]
    if (key in state && Array.isArray(state[key])) {
      index = dataArray.findIndex((obj) => obj.id === idToFind)
      setElementType(state[key][index]?.index)
      setElementTypeName(state[key][index]?.name)
    }
  }

  const handleElementDelete = (elementId, parentId) => {
    //getting selected element type
    // console.log('elementId>>>', elementId)
    // console.log('parentId>>>', parentId)
    // console.log('state>>>', state)

    setState((current) => {
      // 👇️ create copy of state object
      const copy = { ...current }
      // 👇️ remove salary key from object
      // console.log('copy[parentId]', copy[parentId])
      // if (parentId in state && Array.isArray(state[parentId])) {
      //   indexToDelete = copy[parentId].findIndex((obj) => obj.id === elementId)
      //   console.log('INDEX ON DELETE===>', indexToDelete)
      // }
      const index = copy[parentId].findIndex((object) => {
        return object.id === elementId
      })

      // console.log(index); // 👉️ 1

      // delete copy[parentId];
      copy[parentId].splice(index, 1)

      return copy
    })
    setElementType(-1)
  }

  useEffect(() => {
    getElementType()
  }, [selectedElement])

  //console.log(elementType)

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <section className="formbuilder-screen">
      <div className="fluid-container">
        <TopBar />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row m-0" >
            <div className="col-3 elementList">
              <Elements dataElement={allElements} />
            </div>

            <div className="col-6">
              <Content>
                <div className="d-flex justify-content-between">
                  <Button onClick={addList}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                    <ButtonText>Add List</ButtonText>
                  </Button>

                  <Button color="danger" onClick={toggle}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"
                      />
                    </svg>
                    <ButtonText>Preview</ButtonText>
                  </Button>
                </div>
                <Modal isOpen={modal} toggle={toggle} className="preview-modal">
                  <ModalHeader toggle={toggle}>Form Preview</ModalHeader>
                  <ModalBody>
                    {Object.keys(state).map((key) => {
                      const elements = state[key]
                      console.log('element==>', elements)
                      return (
                        <form key={key} style={{ border: '3px solid grey' }}>
                        <div id='globalStyling'>
                          <h4>Form Key: {key}</h4>
                          {elements.map((element, index) => {
                            return <div key={index} dangerouslySetInnerHTML={{ __html: element.htmlContent }} />
                          })}
                          </div>
                        </form>
                      )
                    })}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                      Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {Object.keys(state).map((list, i) => {
                  // console.log('==> list', list)
                  // console.log('==> state', state)
                  return (
                    <div id='globalStyling'>
                    <Droppable key="allElements" droppableId={list}>
                      {(provided, snapshot) => (
                        <Container
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}
                          className="dropable-box"
                        >
                          {state[list].length ? (
                            state[list].map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    isDragging={snapshot.isDragging}
                                    style={provided.draggableProps.style}
                                    onClick={() => handleElementClick(item.id, list)}
                                    className="element-box"
                                  >
                                    <div
                                      className="cross_icon"
                                      onClick={() => handleElementDelete(item.id, list)}
                                      style={{ position: 'absolute', top: -10, right: -5 }}
                                    >
                                      <img src={cross_icon} alt={cross_icon} width="13" height="13" />
                                    </div>

                                    {/* {console.log('item: ' + item.id)} */}
                                    <div
                                      key={item.id}
                                      style={{
                                        backgroundColor: selectedElement === item.id ? 'yellow' : 'transparent',
                                        width: '100%',
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: item.htmlContent,
                                      }}
                                    ></div>
                                    <Handle {...provided.dragHandleProps} className="reorder-handle">
                                      <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                        />
                                      </svg>
                                    </Handle>
                                  </Item>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <Notice>Drop items here</Notice>
                          )}
                          {provided.placeholder}
                        </Container>
                      )}
                    </Droppable>
                    </div>
                  )
                })}
              </Content>
            </div>
            <div className="col-3 inputProperties">
              <p>INPUT PROPERTIES</p> <SingleLineInputProperty Notice={Notice} />
              <p>STYLING PROPERTIES</p> <StylingProperty Notice={Notice} />
            </div>
          </div>
        </DragDropContext>
      </div>
    </section>
  )
}

export default FormBuilderScreen
