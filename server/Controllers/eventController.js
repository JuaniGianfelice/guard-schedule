// eventController.js
const createEvent = async (EventModel, eventData) => {
  try {
    const newEvent = new EventModel(eventData);
    await newEvent.save();
    return { success: true, message: 'Evento creado exitosamente.' };
  } catch (error) {
    console.error("Error al crear evento:", error);
    return { success: false, message: 'Error interno del servidor al crear evento.' };
  }
};

const getEvents = async (EventModel) => {
  try {
    const events = await EventModel.find();
    return { success: true, events: events };
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return { success: false, message: 'Error interno del servidor al obtener eventos.' };
  }
};

module.exports = { createEvent, getEvents };
