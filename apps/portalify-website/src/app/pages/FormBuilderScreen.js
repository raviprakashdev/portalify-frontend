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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import GlobalProperty from '../components/formbuilder/globalProperty'

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
    ${'' /* padding: 0.5rem 0.5rem 0; */}
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
  `

  const Container = styled(List)`
    ${'' /* margin: 0.5rem 0.5rem 1.5rem; */}
    background: #fff0;
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

  // const [stateData, setStateData] = useState({
  //   [uuid()]: {
  //     htmlContent: {
  //       padding: '30px',
  //       backgroundColor: 'lightblue',
  //     },
  //     children: [],
  //   },
  // })

  const onDragEnd = (result) => {
    const { source, destination } = result
    //console.log('state check', state)

    // dropped outside the list
    if (!destination) {
      return
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setState((prevState) => {
          const updatedState = {
            ...prevState,
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: reorder(prevState[destination.droppableId].children, source.index, destination.index),
            },
          }
          return updatedState
        })
        break
      case 'allElements':
        setState((prevState) => {
          const updatedState = {
            ...prevState,
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: copy(allElements, prevState[destination.droppableId].children, source, destination),
            },
          }
          return updatedState
        })
        break
      default:
        setState((prevState) => {
          const updatedState = {
            ...prevState,
            [source.droppableId]: {
              htmlContent: prevState[source.droppableId].htmlContent,
              children: [],
            },
            [destination.droppableId]: {
              htmlContent: prevState[destination.droppableId].htmlContent,
              children: move(
                prevState[source.droppableId].children,
                prevState[destination.droppableId].children,
                source,
                destination,
              ),
            },
          }
          return updatedState
        })
        break
    }
  }

  const addList = (e) => {
    setState({
      ...state,
      [uuid()]: {
        htmlContent: {
          padding: '30px',
          backgroundColor: 'lightblue',
        },
        children: [],
      },
    })
  }

  //----selecting element by ID and updating the value---

  const handleElementClick = (elementid, listid) => {
    setSelectedElement([listid, elementid])
  }

  const getElementType = () => {
    // Getting selected element type
    const selectedElementId = selectedElement[1]
    const elementKeys = Object.keys(state)

    for (const key of elementKeys) {
      const dataArray = state[key]?.children
      if (dataArray && Array.isArray(dataArray)) {
        const index = dataArray.findIndex((obj) => obj.id === selectedElementId)
        if (index !== -1) {
          setElementType(dataArray[index]?.index)
          setElementTypeName(dataArray[index]?.name)
          break
        }
      }
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
      const index = copy[parentId]?.children.findIndex((object) => {
        return object.id === elementId
      })

      // console.log(index); // 👉️ 1

      // delete copy[parentId];
      copy[parentId].children.splice(index, 1)

      return copy
    })
    setElementType(-1)
  }

  useEffect(() => {
    getElementType()

    console.log('selected element==>', selectedElement)
  }, [selectedElement])

  //console.log(elementType)

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  //---------------------------------setting modal Size--------------------------------
  const [modalSize, setModalSize] = useState({ minWidth: '90vw', minHeight: '90vh' })
  const [activeButton, setActiveButton] = useState('laptop')
  const handleSizeChange = (device) => {
    let minWidth = '90vw'
    let minHeight = '90vh'

    if (device === 'phone') {
      minWidth = '30vw'
      minHeight = '30vh'
    } else if (device === 'tablet') {
      minWidth = '60vw'
      minHeight = '60vh'
    } else if (device === 'laptop') {
      minWidth = '90vw'
      minHeight = '90vh'
    }

    setModalSize({ minWidth, minHeight })
    setActiveButton(device)
  }

  return (
    <section className="formbuilder-screen">
      <div className="fluid-container">
        <TopBar />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row m-0">
            <div className="col-3 elementList">
              <Elements dataElement={allElements} />
            </div>

            <div className="col-6">
              <Content>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* <Button onClick={addList}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                    </svg>
                    <ButtonText>Add List</ButtonText>
                  </Button> */}

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
                <Modal isOpen={modal} toggle={toggle} className="preview-modal" style={modalSize}>
                  <ModalHeader toggle={toggle}>
                    <div className="d-flex  align-items-center justify-content-between">
                      Form Preview
                      <div className="d-flex justify-content-between">
                        <Button
                          className={activeButton === 'phone' ? 'activeModalSize' : ''}
                          onClick={() => handleSizeChange('phone')}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M8 2C6.34315 2 5 3.34315 5 5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V5C19 3.34315 17.6569 2 16 2H8ZM7 5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V5ZM10 17C9.44772 17 9 17.4477 9 18C9 18.5523 9.44772 19 10 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H10Z"
                            />
                          </svg>
                        </Button>
                        <Button
                          className={activeButton === 'tablet' ? 'activeModalSize' : ''}
                          onClick={() => handleSizeChange('tablet')}
                        >
                          <svg width="24" height="24" viewBox="0 0 30 30">
                            <path
                              fill="currentColor"
                              d="M23.001 4h-15c-1.105 0-2.001 0.896-2.001 2v20c0 1.104 0.896 2 2.001 2h15c1.104 0 1.999-0.896 1.999-2v-20c0-1.104-0.895-2-1.999-2zM15.5 27c-0.552 0-0.999-0.447-0.999-1s0.447-1 0.999-1c0.553 0 1.001 0.447 1.001 1s-0.448 1-1.001 1zM22.991 23.938h-15.026v-17.912h15.026v17.912z"
                            />
                          </svg>
                        </Button>
                        <Button
                          className={activeButton === 'laptop' ? 'activeModalSize' : ''}
                          onClick={() => handleSizeChange('laptop')}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22,15H21V5a2,2,0,0,0-2-2H5A2,2,0,0,0,3,5V15H2a1,1,0,0,0-1,1,5.006,5.006,0,0,0,5,5H18a5.006,5.006,0,0,0,5-5A1,1,0,0,0,22,15ZM5,5H19V15H5ZM18,19H6a3.006,3.006,0,0,1-2.829-2H20.829A3.006,3.006,0,0,1,18,19Z"
                            />{' '}
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    {Object.keys(state).map((key) => {
                      const elements = state[key]?.children
                      const globalStyling = state[key]?.htmlContent
                      // console.log('statekey==>', state[key])
                      // console.log('globalStyling==>', globalStyling)
                      return (
                        <form key={key}>
                          <div key={key} id="globalStyling" style={globalStyling}>
                            {elements.map((element, index) => {
                              return (
                                <div
                                  style={{ padding: '3px' }}
                                  key={index}
                                  dangerouslySetInnerHTML={{ __html: element.htmlContent }}
                                />
                              )
                            })}
                          </div>
                        </form>
                      )
                    })}
                  </ModalBody>
                  <ModalFooter>
                   {' '}
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {Object.keys(state).map((list, i) => {
                  //console.log('==> list', list)
                  //console.log('==> state', state)
                  const globalStyling = state[list]?.htmlContent
                  return (
                    <Droppable key="allElements" droppableId={list}>
                      {(provided, snapshot) => (
                        <div key={list} id="globalStyling" style={globalStyling}>
                          <Container
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            className="dropable-box"
                          >
                            {state[list].children.length ? (
                              state[list].children.map((item, index) => (
                                <div>
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
                                </div>
                              ))
                            ) : (
                              <Notice>Drop items here</Notice>
                            )}
                            {provided.placeholder}
                          </Container>
                        </div>
                      )}
                    </Droppable>
                  )
                })}
              </Content>
            </div>

            <div className="col-3 inputProperties">
              <Tabs className="Tabs">
                <TabList className=" d-flex">
                  <Tab>Element Styling</Tab>
                  <Tab>Global Styling</Tab>
                </TabList>
                <TabPanel>
                  <p>INPUT PROPERTIES</p> <SingleLineInputProperty Notice={Notice} />
                  <p>STYLING PROPERTIES</p> <StylingProperty Notice={Notice} />
                </TabPanel>
                <TabPanel>
                  <p>GLOBAL STYLING</p> <GlobalProperty Notice={Notice} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </DragDropContext>
      </div>
    </section>
  )
}

export default FormBuilderScreen
