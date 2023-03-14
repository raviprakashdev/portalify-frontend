import React from 'react'
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

  return (
    <div>
      {elementList.map((item, index) => (
        <div key={index}>
          <div className="element_heading">{item.type}</div>
          <div className="element_list d-flex"> 
          {item.elements.map((i) => (
            <div key={index} className="element_group">
              <div className="element_icon">
                <img src={i.icon} alt="icon" />
              </div>
              <div className="element_name">{i.name}</div>
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Elements
