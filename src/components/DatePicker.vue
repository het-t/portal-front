<template>
    <div class="box">
        <date-picker-vue
            class="date-picker"
            v-model:value="dates"
            format="DD/MM/YYYY, HH:mm:ss"
            value-type="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            range
            placeholder="From ~ To"
        >
        </date-picker-vue>
    </div>
</template>

<script>
import DatePickerVue from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css';

export default {
    name: 'DatePicker',
    components: { DatePickerVue },
    data() {
        return {
            dates: []
        }
    },
    watch: {
        dates() {
            this.$emit('datePicker', this.dates)
        }
    }
}
</script>

<style>
.date-picker {
    color: #676A6C !important;
}
.mx-calendar tr,
.mx-calendar th,
.mx-calendar td {
    border-right: none !important;
}
.date-picker div {
    text-align: center !important;
}

.mx-datepicker-main button:hover {
    border: none !important;
}
.box input {
    height: 40px !important;
}
.mx-input {
    border: none;
    color: #676A6C !important;
}
</style>