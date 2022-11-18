<template>
    <div class="actions">
        <label for="search" class="mr8">search</label>
        <select @change="filter" v-model="dataToFind" id="search" class="mr24">
            <option value="" selected>none</option>
            <option v-for="field in dataFields" :value="[field.name, field.relation, field.type, field?.values].join('/')" :key="field.name">
                {{field.name}}
            </option>
        </select>

        <div v-if="dataToFind != ''">
            <div v-if="dataTypeToFind == 'select'" id="filter-select">
                <select v-model="dataValueToFind1" @change="filter" name="filter" id="filter-select-values">
                    <option v-for="value in dataValuesToFind" :value="value" :key="value">
                        {{value}}
                    </option>
                </select>
            </div>
            <div v-else id="filter-inputs">
                <input @input="filter" :type="dataTypeToFind" v-model="dataValueToFind1">
                <span v-if="dataTypeToFind == 'date'" class="mr8 ml8"> to </span>
                <input @input="filter" v-if="dataTypeToFind == 'date'" :type="dataTypeToFind" v-model="dataValueToFind2">
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'FullFilter',
        data() {
            return {
                dataToFind: '',
                dataValueToFind1: '',
                dataValueToFind2: '',
            }
        },
        computed: {
            dataValuesToFind() {
                return this.dataToFind?.split('/')[3].split(',')
            },
            dataTypeToFind() {
                return this.dataToFind?.split('/')[2]
            },
            dataRealtionToFind() {
                return this.dataToFind?.split('/')[1]
            }
        },
        props: {
            tableData: JSON,
            dataFields: JSON,
            clear: Boolean
        },
        methods: {
            filter() {
                console.log(this.dataToFind)
                let filteredData = []
                let key = this.dataToFind.split('/')[0]
                let relation = this.dataToFind.split('/')[1]
                console.log(this.dataValueToFind1, this.dataValueToFind2)

                if (this.dataToFind == '' || (this.dataValueToFind1 == '' && this.dataValueToFind2 == '')){
                    this.$emit('filtered', this.tableData)
                }
                else
                    for(let o of this.tableData) {
                        switch (relation) {
                            case 'exact': {
                                if ((o[key]).toString().includes(this.dataValueToFind1) == true) {
                                    filteredData.push(o)
                                }
                                break
                            }
                            case 'inequality': {
                                if ((o[key] >= this.dataValueToFind1) && (o[key] <= this.dataValueToFind2)) {
                                    filteredData.push(o)
                                } 
                                break
                            }
                        }
                        this.$emit('filtered', filteredData)
                    }
            }
        },
        created() {
            console.log(this.dataFields)
        },
}
</script>

<style scoped>
    select {
        width: fit-content !important;
    }
    input {
        width:150px;
    }
    #filter-inputs {
        display: flex;
        align-items: center;
    }
</style>