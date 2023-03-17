import React, { useState } from "react"
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

const Elements = () => {
  const elementList = [
    {
      type: 'Text Elements',
      elements: [
        {
          name: 'Single Line',
          icon: singleLine_icon,
          //html content
        },
        {
          name: 'Text Area',
          icon: textArea_icon,
        },
        {
          name: 'Number',
          icon: number_icon,
        },
      ],
    },
    {
      type: 'Date Elements',
      elements: [
        {
          name: 'Date',
          icon: date_icon,
        },
        {
          name: 'Date & Time',
          icon: dateAndTime_icon,
        },
      ],
    },

    {
      type: 'Multi Elements',
      elements: [
        {
          name: 'Dropdown',
          icon: dropdown_icon,
        },
        {
          name: 'Radio Button',
          icon: radioButton_icon,
        },
        {
          name: 'Checkbox',
          icon: checkbox_icon,
        },
        {
          name: 'Switch',
          icon: switch_icon,
        },
      ],
    },

    {
      type: 'Media Elements',
      elements: [
        {
          name: 'Image',
          icon: image_icon,
        },
        {
          name: 'Attachment',
          icon: attachment_icon,
        },
      ],
    },
    {
      type: 'Other Elements',
      elements: [
        {
          name: 'Divider',
          icon: divider_icon,
        },
      ],
    },
  ]




  const [searchQuery, setSearchQuery] = useState('');
  const [filteredElements, setFilteredElements] = useState(elementList);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    const filtered = elementList.filter((category) => {
      return category.elements.filter((element) => {
        return (
          element.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          category.type.toLowerCase().includes(event.target.value.toLowerCase())
        );
      }).length > 0;
    });
    setFilteredElements(filtered);
  };


  const filteredElementList = filteredElements.map((category) => {
    return (

      
        <div key={category.type}>
          <div className="element_heading">{category.type}</div>
          <div className="element_list row">
            {category.elements.filter((element) => {
          return (
            element.name.toLowerCase().includes(searchQuery.toLowerCase())  ||
            category.type.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }).map((element) => (
              <div className="col-md-6 col-sm-12">
              <div key={element.name} className="element_group">
                <div className="element_icon">
                  <img src={element.icon} alt={element.name} />
                </div>
                <div className="element_name">{element.name}</div>
              </div>
              </div>
            ))}
          </div>
        </div>
      
    );
  });
  


  return (
    <div>
 <div className="search-header">
       
        <input type="text" value={searchQuery} placeholder="Search" onChange={handleSearchInputChange} />

      </div>

      
      {filteredElementList}
    </div>
  )
}

export default Elements
