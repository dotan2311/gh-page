//@ts-ignore
import { MapElementFactory } from "vue2-google-maps";
export default MapElementFactory({
  name: "directionsRenderer",

  ctr() {
    return google.maps.DirectionsRenderer;
  },

  events: ['directions_changed'],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String }
  },

  afterCreate(directionsRenderer: any) {
    setTimeout(() => {
      let directionsService = new google.maps.DirectionsService();
      this.$watch(
        () => [this.origin, this.destination, this.travelMode],
        () => {
          let { origin, destination, travelMode } = this;
          if (!origin || !destination || !travelMode) return;

          directionsService.route(
            {
              origin,
              destination,
              travelMode
            },
            (response, status) => {
              if (status !== "OK") return;
              directionsRenderer.setDirections(response);
            }
          );
        }
      );
    }, 5000);
  }
});
