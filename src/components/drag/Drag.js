import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.scss";

// const mystyle = {
//   width: "30%",
//   margin: "0 auto 30px auto",
// };

const data = [
  {
    id: "gary",
    name: "Gary Goodspeed1",
    thumb:
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  },
  {
    id: "gary2",
    name: "Gary Goodspeed2",
    thumb:
      "https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg",
  },
  {
    id: "garyaaaaa",
    name: "Gary Goodspeed3",
    thumb:
      "https://baoninhbinh.org.vn//DATA/ARTICLES/2021/5/17/cuoc-dua-lot-vao-top-100-anh-dep-di-san-van-hoa-va-thien-7edf3.jpg",
  },
];

const Drag = () => {
  const [characters, updateCharacters] = useState(data);
  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }
  return (
    <div>
      <h1>Drag</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map(({ id, name, thumb }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div>
                        <div className="text">
                          <p>{name}</p>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Drag;
