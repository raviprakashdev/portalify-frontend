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

// a little function to help us with reordering the result

const FormBuilderScreen = () => {
  const { elementList, allElements, selectedElement, setSelectedElement, state, setState, setElementType } =
    useContext(UserContext)

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
    // console.log('state check', state)

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

      var indexToDelete = -1
      // 👇️ remove salary key from object
      // console.log('copy[parentId]', copy[parentId])
      // if (parentId in state && Array.isArray(state[parentId])) {
      //   indexToDelete = copy[parentId].findIndex((obj) => obj.id === elementId)
      //   console.log('INDEX ON DELETE===>', indexToDelete)
      // }
      const index = copy[parentId].findIndex(object => {
        return object.id === elementId;
      });
      
      // console.log(index); // 👉️ 1

      // delete copy[parentId];
      copy[parentId].splice(index, 1)

      return copy
    })

    // var indexToDelete = -1
    // const key = parentId
    // const idToFind = elementId
    // const dataArray = [...state[key]]
    // var newState = state
    // if (key in state && Array.isArray(state[key])) {
    //   indexToDelete = dataArray.findIndex((obj) => obj.id === idToFind)
    //   // console.log('INDEX ON DELETE===>', indexToDelete)
    // }

    // if (indexToDelete !== -1) {
    //   dataArray.splice(indexToDelete, 1)
    //   // newState[key]=dataArray;
    //   // console.log('state after DELETE===>', key,newState[key])
    //   // console.log('data after DELETE===>', dataArray)
    //   //setState(newState);
    // }
  }

  useEffect(() => {
    getElementType()
  }, [selectedElement])

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <section className="formbuilder-screen">
      <div className="container">
        <TopBar />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row ">
            <div className="col-3 elementList">
              <Elements dataElement={allElements} />
            </div>
            <div className="col-6">
              <Content>
                <Button onClick={addList}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  <ButtonText>Add List</ButtonText>
                </Button>

                {Object.keys(state).map((list, i) => {
                  // console.log('==> list', list)
                  // console.log('==> state', state)
                  return (
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
                                  >
                                    <div
                                      className="cross_icon"
                                      onClick={() => handleElementDelete(item.id, list)}
                                      style={{ position: 'absolute', top: -10, right: -5 }}
                                    >
                                      <img src={cross_icon} alt={cross_icon} width="13" height="13" />
                                    </div>
                                    <Handle {...provided.dragHandleProps}>
                                      <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                          fill="currentColor"
                                          d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                        />
                                      </svg>
                                    </Handle>
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
                  )
                })}
              </Content>
            </div>
            <div className="col-3 inputProperties">
              <p>INPUT PROPERTIES</p> <SingleLineInputProperty Notice={Notice} />
            </div>
          </div>
        </DragDropContext>
      </div>
      <div>
        <Button color="danger" onClick={toggle}>
          Click Me
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
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
      </div>
    </section>
  )
}

export default FormBuilderScreen
