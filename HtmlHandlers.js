//Recursive function to handle properties within properties
export const HandleSubs = function (element, property, properties)
{
    for (key in properties)
    {
        if (typeof (properties[key]) == "object" && properties[key][0] == undefined)
        {
            HandleSubs(element, element[key], properties[key]);
        }
        else property[key] = properties[key];
    }
}
//Makes a new element, adds it to the parent, and adds all specified properties and event listeners
export const AddElement = function (type, parent, properties, eventListeners)
{
    let NewElement = document.createElement(type);

    HandleSubs(NewElement, NewElement, properties);

    for (key in eventListeners)
    {
        NewElement.addEventListener(key, eventListeners[key]);
    }

    if (parent) parent.appendChild(NewElement);

    return NewElement;
};
//Applies properties and event listeners to an element
export const EditElement = function (element, properties, eventListeners)
{

    HandleSubs(element, element, properties);

    for (key in eventListeners)
    {
        element.addEventListener(key, eventListeners[key]);
    }

    return element;
};