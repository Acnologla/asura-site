<template>
    <div class="home">
        <Galos @change="change"></Galos>
        <center>
            <h1 style="margin-top: -90px;font-family: Roboto;font-size: 32px">{{this.classes[this.current+1].name}}</h1>
            <br>
            <div class="columns is-variable is-centered" style="margin-left: 30px;margin-right: 30px">
                <card class ="column is-three-quarters-mobile is-half-tablet is-one-third" type="Bom contra" :galos="findGood(this.current)" ></card>
                <card class ="column is-three-quarters-mobile is-half-tablet is-one-third" type="Ruim contra" :galos="findBad(this.current)" ></card>
            </div>
            <h1 style="margin-bottom:20px;font-family: Roboto;font-size: 32px">Habilidades</h1>
            <br>
            <div class="columns is-multiline" style="margin-left: 30px;margin-right: 30px">
                <Skill class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd" v-for="(skill,i) in skills" :key="i" :skill="skill"></Skill>
            </div>
        </center>
    </div>
</template>

<script>
import Galos from "@/components/Galos"
import Skill from "@/components/Skill"
import Card from  "@/components/Card"
import axios from "axios"
export default {
    name: 'Home',
    data() {
        return {
            skills: [],
            current: 0,
            classes: [],
            effects: []
        }
    },
    methods: {
        change(val) {
            this.current = val
            this.$router.push({query: {
                galo: val,
            }})
            this.updateSkills()
        },
        findBad(galo){
            if (!this.classes[galo+1].disadvantages) return [];
            return this.classes[galo+1].disadvantages.map(disadvantage => this.classes[disadvantage])
        },
        findGood(galo){
            return this.classes.filter((galoClass) => {
                if (!galoClass.disadvantages) return false;
                return galoClass.disadvantages.includes(galo+1)
            })
        },
        updateSkills() {
            const selectedClass = this.classes[this.current + 1]
            axios.get(`https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/attacks/${selectedClass.name}.json`).then(skills => {
                skills.data.filter(skill => skill.effect).forEach(skill => {
                    skill.effect = {
                        chance: skill.effect[0],
                        effect: this.effects[skill.effect[1]]
                    }
                })
                this.skills = skills.data
            })
        }
    },
    async created() {
        await axios.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/class.json").then(classes => {
            this.classes = classes.data
        })
        await axios.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/effects.json").then(effects => {
            this.effects = effects.data
        })
         if (this.$route.query.galo){
            this.current = parseInt(this.$route.query.galo)
        }
        this.updateSkills()
    },
    components: {
        Galos,
        Skill,
        Card
    }
}
</script>
