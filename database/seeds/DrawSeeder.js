'use strict';

/*
|--------------------------------------------------------------------------
| DrawSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Event = use('App/Models/Event');
const Round = use('App/Models/Round');
const Group = use('App/Models/Group');
const Judge = use('App/Models/Judge');
const Competitor = use('App/Models/Competitor');

class DrawSeeder {
  async run() {
    const event_1 = new Event();
    event_1.name = 'Karate Kata Class -75';
    event_1.class = '-75';
    await event_1.save();

    // round 1

    const round_1 = new Round();
    round_1.title = 'Round 1';
    round_1.status = 'ready';
    round_1.event_id = event_1.id;
    await round_1.save();

    const group_1_1 = new Group();
    group_1_1.name = 'Group 1';
    group_1_1.status = 'ready';
    group_1_1.round_id = round_1.id;
    await group_1_1.save();

    const group_1_2 = new Group();
    group_1_2.name = 'Group 2';
    group_1_2.status = 'ready';
    group_1_2.round_id = round_1.id;
    await group_1_2.save();

    const group_1_3 = new Group();
    group_1_3.name = 'Group 3';
    group_1_3.status = 'ready';
    group_1_3.round_id = round_1.id;
    await group_1_3.save();

    const group_1_4 = new Group();
    group_1_4.name = 'Group 4';
    group_1_4.status = 'ready';
    group_1_4.round_id = round_1.id;
    await group_1_4.save();

    const group_1_5 = new Group();
    group_1_5.name = 'Group 5';
    group_1_5.status = 'ready';
    group_1_5.round_id = round_1.id;
    await group_1_5.save();

    const group_1_6 = new Group();
    group_1_6.name = 'Group 6';
    group_1_6.status = 'ready';
    group_1_6.round_id = round_1.id;
    await group_1_6.save();

    const group_1_7 = new Group();
    group_1_7.name = 'Group 7';
    group_1_7.status = 'ready';
    group_1_7.round_id = round_1.id;
    await group_1_7.save();

    const group_1_8 = new Group();
    group_1_8.name = 'Group 8';
    group_1_8.status = 'ready';
    group_1_8.round_id = round_1.id;
    await group_1_8.save();

    // round 2

    const round_2 = new Round();
    round_2.title = 'Round 2';
    round_2.status = 'ready';
    round_2.event_id = event_1.id;
    await round_2.save();

    const group_2_1 = new Group();
    group_2_1.name = 'Group 1';
    group_2_1.status = 'ready';
    group_2_1.round_id = round_2.id;
    await group_2_1.save();

    const group_2_2 = new Group();
    group_2_2.name = 'Group 2';
    group_2_2.status = 'ready';
    group_2_2.round_id = round_2.id;
    await group_2_2.save();

    const group_2_3 = new Group();
    group_2_3.name = 'Group 3';
    group_2_3.status = 'ready';
    group_2_3.round_id = round_2.id;
    await group_2_3.save();

    const group_2_4 = new Group();
    group_2_4.name = 'Group 4';
    group_2_4.status = 'ready';
    group_2_4.round_id = round_2.id;
    await group_2_4.save();

    // round 3

    const round_3 = new Round();
    round_3.title = 'Round 3';
    round_3.status = 'ready';
    round_3.event_id = event_1.id;
    await round_3.save();

    const group_3_1 = new Group();
    group_3_1.name = 'Group 1';
    group_3_1.status = 'ready';
    group_3_1.round_id = round_3.id;
    await group_3_1.save();

    const group_3_2 = new Group();
    group_3_2.name = 'Group 2';
    group_3_2.status = 'ready';
    group_3_2.round_id = round_3.id;
    await group_3_2.save();

    const round_final = new Round();
    round_final.title = 'Round Final';
    round_final.status = 'ready';
    round_final.event_id = event_1.id;
    await round_final.save();

    const group_final = new Group();
    group_final.name = 'Group Final';
    group_final.status = 'ready';
    group_final.round_id = round_final.id;
    await group_final.save();

    // judges
    const judge_1 = new Judge();
    judge_1.name = 'judge_1';
    await judge_1.save();

    const judge_2 = new Judge();
    judge_2.name = 'judge_2';
    await judge_2.save();

    const judge_3 = new Judge();
    judge_3.name = 'judge_3';
    await judge_3.save();

    const judge_4 = new Judge();
    judge_4.name = 'judge_4';
    await judge_4.save();

    const judge_5 = new Judge();
    judge_5.name = 'judge_5';
    await judge_5.save();

    const judge_6 = new Judge();
    judge_6.name = 'judge_6';
    await judge_6.save();

    const judge_7 = new Judge();
    judge_7.name = 'judge_7';
    await judge_7.save();

    const judge_8 = new Judge();
    judge_8.name = 'judge_8';
    await judge_8.save();

    const judge_9 = new Judge();
    judge_9.name = 'judge_9';
    await judge_9.save();

    const judge_10 = new Judge();
    judge_10.name = 'judge_10';
    await judge_10.save();

    // competitor dummy
    const comp_1 = new Competitor();
    comp_1.event_id = event_1.id;
    comp_1.name = 'comp_1';
    comp_1.contingen = 'KFC';
    comp_1.type = 'Soto ryu';
    await comp_1.save();

    const comp_2 = new Competitor();
    comp_2.event_id = event_1.id;
    comp_2.name = 'comp_2';
    comp_2.contingen = 'KFC';
    comp_2.type = 'Soto ryu';
    await comp_2.save();

    const comp_3 = new Competitor();
    comp_3.event_id = event_1.id;
    comp_3.name = 'comp_3';
    comp_3.contingen = 'KFC';
    comp_3.type = 'Soto ryu';
    await comp_3.save();

    const comp_4 = new Competitor();
    comp_4.event_id = event_1.id;
    comp_4.name = 'comp_4';
    comp_4.contingen = 'KFC';
    comp_4.type = 'Soto ryu';
    await comp_4.save();

    const comp_5 = new Competitor();
    comp_5.event_id = event_1.id;
    comp_5.name = 'comp_5';
    comp_5.contingen = 'KFC';
    comp_5.type = 'Soto ryu';
    await comp_5.save();

    const comp_6 = new Competitor();
    comp_6.event_id = event_1.id;
    comp_6.name = 'comp_6';
    comp_6.contingen = 'KFC';
    comp_6.type = 'Soto ryu';
    await comp_6.save();

    const comp_7 = new Competitor();
    comp_7.event_id = event_1.id;
    comp_7.name = 'comp_7';
    comp_7.contingen = 'KFC';
    comp_7.type = 'Soto ryu';
    await comp_7.save();

    const comp_8 = new Competitor();
    comp_8.event_id = event_1.id;
    comp_8.name = 'comp_8';
    comp_8.contingen = 'KFC';
    comp_8.type = 'Soto ryu';
    await comp_8.save();

    const comp_9 = new Competitor();
    comp_9.event_id = event_1.id;
    comp_9.name = 'comp_9';
    comp_9.contingen = 'KFC';
    comp_9.type = 'Soto ryu';
    await comp_9.save();

    const comp_10 = new Competitor();
    comp_10.event_id = event_1.id;
    comp_10.name = 'comp_10';
    comp_10.contingen = 'KFC';
    comp_10.type = 'Soto ryu';
    await comp_10.save();

    const comp_11 = new Competitor();
    comp_11.event_id = event_1.id;
    comp_11.name = 'comp_11';
    comp_11.contingen = 'KFC';
    comp_11.type = 'Soto ryu';
    await comp_11.save();

    const comp_12 = new Competitor();
    comp_12.event_id = event_1.id;
    comp_12.name = 'comp_12';
    comp_12.contingen = 'KFC';
    comp_12.type = 'Soto ryu';
    await comp_12.save();

    const comp_13 = new Competitor();
    comp_13.event_id = event_1.id;
    comp_13.name = 'comp_13';
    comp_13.contingen = 'KFC';
    comp_13.type = 'Soto ryu';
    await comp_13.save();

    const comp_14 = new Competitor();
    comp_14.event_id = event_1.id;
    comp_14.name = 'comp_14';
    comp_14.contingen = 'KFC';
    comp_14.type = 'Soto ryu';
    await comp_14.save();

    const comp_15 = new Competitor();
    comp_15.event_id = event_1.id;
    comp_15.name = 'comp_15';
    comp_15.contingen = 'KFC';
    comp_15.type = 'Soto ryu';
    await comp_15.save();

    const comp_16 = new Competitor();
    comp_16.event_id = event_1.id;
    comp_16.name = 'comp_16';
    comp_16.contingen = 'KFC';
    comp_16.type = 'Soto ryu';
    await comp_16.save();

    const comp_17 = new Competitor();
    comp_17.event_id = event_1.id;
    comp_17.name = 'comp_17';
    comp_17.contingen = 'KFC';
    comp_17.type = 'Soto ryu';
    await comp_17.save();

    const comp_18 = new Competitor();
    comp_18.event_id = event_1.id;
    comp_18.name = 'comp_18';
    comp_18.contingen = 'KFC';
    comp_18.type = 'Soto ryu';
    await comp_18.save();

    const comp_19 = new Competitor();
    comp_19.event_id = event_1.id;
    comp_19.name = 'comp_19';
    comp_19.contingen = 'KFC';
    comp_19.type = 'Soto ryu';
    await comp_19.save();

    const comp_20 = new Competitor();
    comp_20.event_id = event_1.id;
    comp_20.name = 'comp_20';
    comp_20.contingen = 'KFC';
    comp_20.type = 'Soto ryu';
    await comp_20.save();

    const comp_21 = new Competitor();
    comp_21.event_id = event_1.id;
    comp_21.name = 'comp_21';
    comp_21.contingen = 'KFC';
    comp_21.type = 'Soto ryu';
    await comp_21.save();

    const comp_22 = new Competitor();
    comp_22.event_id = event_1.id;
    comp_22.name = 'comp_22';
    comp_22.contingen = 'KFC';
    comp_22.type = 'Soto ryu';
    await comp_22.save();

    const comp_23 = new Competitor();
    comp_23.event_id = event_1.id;
    comp_23.name = 'comp_23';
    comp_23.contingen = 'KFC';
    comp_23.type = 'Soto ryu';
    await comp_23.save();

    const comp_24 = new Competitor();
    comp_24.event_id = event_1.id;
    comp_24.name = 'comp_24';
    comp_24.contingen = 'KFC';
    comp_24.type = 'Soto ryu';
    await comp_24.save();

    const comp_25 = new Competitor();
    comp_25.event_id = event_1.id;
    comp_25.name = 'comp_25';
    comp_25.contingen = 'KFC';
    comp_25.type = 'Soto ryu';
    await comp_25.save();

    const comp_26 = new Competitor();
    comp_26.event_id = event_1.id;
    comp_26.name = 'comp_26';
    comp_26.contingen = 'KFC';
    comp_26.type = 'Soto ryu';
    await comp_26.save();

    const comp_27 = new Competitor();
    comp_27.event_id = event_1.id;
    comp_27.name = 'comp_27';
    comp_27.contingen = 'KFC';
    comp_27.type = 'Soto ryu';
    await comp_27.save();

    const comp_28 = new Competitor();
    comp_28.event_id = event_1.id;
    comp_28.name = 'comp_28';
    comp_28.contingen = 'KFC';
    comp_28.type = 'Soto ryu';
    await comp_28.save();

    const comp_29 = new Competitor();
    comp_29.event_id = event_1.id;
    comp_29.name = 'comp_29';
    comp_29.contingen = 'KFC';
    comp_29.type = 'Soto ryu';
    await comp_29.save();

    const comp_30 = new Competitor();
    comp_30.event_id = event_1.id;
    comp_30.name = 'comp_30';
    comp_30.contingen = 'KFC';
    comp_30.type = 'Soto ryu';
    await comp_30.save();

    const comp_31 = new Competitor();
    comp_31.event_id = event_1.id;
    comp_31.name = 'comp_31';
    comp_31.contingen = 'KFC';
    comp_31.type = 'Soto ryu';
    await comp_31.save();

    const comp_32 = new Competitor();
    comp_32.event_id = event_1.id;
    comp_32.name = 'comp_32';
    comp_32.contingen = 'KFC';
    comp_32.type = 'Soto ryu';
    await comp_32.save();
  }
}

module.exports = DrawSeeder;
