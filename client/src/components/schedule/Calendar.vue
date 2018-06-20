<template>
<full-calendar :events="events"></full-calendar>

</template>

<script>
import moment from 'moment'
export default {
    name: 'hello',
    data: function() {
        return {
            events: [
                {
                    title: 'test',
                    resourceId: 'a',
                    start: moment(),
                    end: moment().add(1, 'd')
                },
                {
                    title: 'test',
                    resourceId: 'a2',
                    start: moment().add(2, 'd'),
                    end: moment().add(3, 'd')
                }
            ],

            config: {
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                defaultView: 'timelineDay',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'timelineDay,timelineWeek,timelineMonth'
                },
                resourceLabelText: 'Rooms',
                resources: [
                    {
                        id: 'a',
                        title: 'Room A'
                    }
                ]
            }
        }
    }
}
</script>
